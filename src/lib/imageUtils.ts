// Utilitários para processamento de imagens

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ProcessedImage {
  base64: string;
  width: number;
  height: number;
}

// Validar se o arquivo é uma imagem
export function validateImageFile(file: File): ImageValidationResult {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de arquivo não suportado. Use apenas JPEG, PNG ou WebP.'
    };
  }

  // Verificar tamanho máximo (5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Arquivo muito grande. Tamanho máximo: 5MB.'
    };
  }

  return { isValid: true };
}

// Processar imagem para base64 com redimensionamento
export function processImageToBase64(file: File): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calcular novas dimensões mantendo proporção quadrada
      const maxSize = 512;
      let { width, height } = img;
      
      // Redimensionar para caber em 512x512
      if (width > height) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else {
        width = (width / height) * maxSize;
        height = maxSize;
      }

      // Configurar canvas
      canvas.width = maxSize;
      canvas.height = maxSize;
      
      if (!ctx) {
        reject(new Error('Não foi possível criar contexto do canvas'));
        return;
      }

      // Desenhar imagem centralizada no canvas quadrado
      const offsetX = (maxSize - width) / 2;
      const offsetY = (maxSize - height) / 2;
      
      ctx.fillStyle = '#ffffff'; // Fundo branco
      ctx.fillRect(0, 0, maxSize, maxSize);
      
      ctx.drawImage(img, offsetX, offsetY, width, height);

      // Converter para base64
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      
      resolve({
        base64,
        width: maxSize,
        height: maxSize
      });
    };

    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };

    // Carregar imagem do arquivo
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    reader.readAsDataURL(file);
  });
}

// Validar dimensões da imagem
export function validateImageDimensions(width: number, height: number): ImageValidationResult {
  const maxDimension = 512;
  
  if (width > maxDimension || height > maxDimension) {
    return {
      isValid: false,
      error: `Dimensões muito grandes. Máximo: ${maxDimension}x${maxDimension}px.`
    };
  }

  return { isValid: true };
}

// Remover prefixo data:image/...;base64, do base64
export function cleanBase64(base64: string): string {
  return base64.replace(/^data:image\/[a-z]+;base64,/, '');
}

// Adicionar prefixo data:image/jpeg;base64, ao base64
export function addBase64Prefix(base64: string): string {
  if (base64.startsWith('data:')) {
    return base64;
  }
  return `data:image/jpeg;base64,${base64}`;
}
