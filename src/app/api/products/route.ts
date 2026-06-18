import { NextResponse } from 'next/server';
import { products as currentProducts, Product } from '@/data/products';

export async function POST(request: Request) {
  return handleProductUpdate(request, 'POST');
}

export async function PUT(request: Request) {
  return handleProductUpdate(request, 'PUT');
}

export async function DELETE(request: Request) {
  return handleProductUpdate(request, 'DELETE');
}

export async function PATCH(request: Request) {
  return handleProductUpdate(request, 'PATCH');
}

async function handleProductUpdate(request: Request, method: 'POST' | 'PUT' | 'DELETE' | 'PATCH') {
  try {
    // 1. Check authentication
    const cookieHeader = request.headers.get('cookie') || '';
    if (!cookieHeader.includes('admin_auth=authenticated')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const payload = await request.json();
    let updatedProducts = [...currentProducts];
    
    if (method === 'POST') {
      payload.id = `moon-${payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}`;
      updatedProducts.push(payload as Product);
    } else if (method === 'PUT') {
      const index = updatedProducts.findIndex(p => p.id === payload.id);
      if (index === -1) return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      updatedProducts[index] = payload as Product;
    } else if (method === 'DELETE') {
      const index = updatedProducts.findIndex(p => p.id === payload.id);
      if (index === -1) return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      updatedProducts.splice(index, 1);
    } else if (method === 'PATCH') {
      const index = updatedProducts.findIndex(p => p.id === payload.id);
      if (index === -1) return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
      
      if (payload.direction === 'up' && index > 0) {
        const temp = updatedProducts[index - 1];
        updatedProducts[index - 1] = updatedProducts[index];
        updatedProducts[index] = temp;
      } else if (payload.direction === 'down' && index < updatedProducts.length - 1) {
        const temp = updatedProducts[index + 1];
        updatedProducts[index + 1] = updatedProducts[index];
        updatedProducts[index] = temp;
      } else {
        return NextResponse.json({ error: 'Action ignorée' }, { status: 400 });
      }
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const OWNER = process.env.GITHUB_OWNER; 
    const REPO = process.env.GITHUB_REPO; 
    const PATH = process.env.GITHUB_FILE_PATH || 'src/data/products.ts'; 
    const BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !OWNER || !REPO) {
      console.warn("GitHub environment variables are missing. Simulating success for development.");
      return NextResponse.json({ 
        success: true, 
        message: 'Mode simulation : Variables GITHUB_TOKEN manquantes.' 
      });
    }

    // 2. Fetch the current file metadata from GitHub to get the SHA
    const fileUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    const fileRes = await fetch(`${fileUrl}?ref=${BRANCH}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!fileRes.ok) {
      const errText = await fileRes.text();
      throw new Error(`Erreur lors de la récupération du fichier sur GitHub: ${errText}`);
    }

    const fileData = await fileRes.json();

    // 3. Generate the new file content
    const fileHeader = `export interface Ingredient {
  name: string;
  imageUrl: string;
}

export interface ReheatAdvice {
  microwave?: string;
  oven?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  detailedDescription?: string;
  imageUrl: string;
  images?: string[];
  ingredients?: string[]; // Kept for backwards compatibility
  detailedIngredients?: Ingredient[];
  reheatAdvice?: ReheatAdvice;
}

export const products: Product[] = `;

    const newContent = fileHeader + JSON.stringify(updatedProducts, null, 2) + ';\n';

    // 4. Commit the new file back to GitHub
    let commitMessage = `Modification du produit: ${payload.name || payload.id}`;
    if (method === 'POST') commitMessage = `Ajout du produit: ${payload.name}`;
    if (method === 'DELETE') commitMessage = `Suppression du produit: ${payload.id}`;
    if (method === 'PATCH') commitMessage = `Réorganisation du produit: ${payload.id}`;
    
    const commitRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(newContent).toString('base64'),
        sha: fileData.sha,
        branch: BRANCH,
      }),
    });

    if (!commitRes.ok) {
      const errText = await commitRes.text();
      throw new Error(`Erreur lors du commit sur GitHub: ${errText}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
}
