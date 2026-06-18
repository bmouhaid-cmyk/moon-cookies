import { NextResponse } from 'next/server';
import { settings as currentSettings, SiteSettings } from '@/data/settings';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    if (!cookieHeader.includes('admin_auth=authenticated')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const payload = await request.json();
    
    // Update settings
    const updatedSettings = { ...currentSettings, ...payload };

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const OWNER = process.env.GITHUB_OWNER; 
    const REPO = process.env.GITHUB_REPO; 
    const PATH = 'src/data/settings.ts'; 
    const BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !OWNER || !REPO) {
      console.warn("GitHub environment variables are missing.");
      return NextResponse.json({ success: true, message: "Simulation (Variables GitHub manquantes)" });
    }

    const fileUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    const fileRes = await fetch(`${fileUrl}?ref=${BRANCH}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    });

    let sha = null;
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      sha = fileData.sha;
    } else if (fileRes.status !== 404) {
       throw new Error(`Erreur lors de la récupération du fichier sur GitHub`);
    }

    const fileHeader = `export interface SiteSettings {
  whatsappNumber: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroImageUrl: string;
  instagramLink: string;
  instagramHandle: string;
  contactAddress: string;
  footerDescription: string;
}

export const settings: SiteSettings = `;

    const newContent = fileHeader + JSON.stringify(updatedSettings, null, 2) + ';\n';
    
    const body: any = {
      message: 'Mise à jour des paramètres du site',
      content: Buffer.from(newContent).toString('base64'),
      branch: BRANCH,
    };
    
    if (sha) {
        body.sha = sha;
    }

    const commitRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!commitRes.ok) {
        const errorText = await commitRes.text();
        throw new Error(`Erreur lors du commit sur GitHub: ${errorText}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
