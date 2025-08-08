'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { validateImageFile, processImageToBase64, ProcessedImage } from '@/lib/imageUtils';

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, onError, className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      // Validar arquivo
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Processar imagem
      const processedImage: ProcessedImage = await processImageToBase64(file);
      
      // Atualizar preview e valor
      setPreview(processedImage.base64);
      onChange(processedImage.base64);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar imagem';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${error 
            ? 'border-red-300 bg-red-50 hover:bg-red-100' 
            : preview 
              ? 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              : 'border-gray-300 bg-white hover:bg-gray-50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {isProcessing ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600">Processando imagem...</p>
          </div>
        ) : preview ? (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg mx-auto"
            />
            <p className="text-sm text-gray-600">Clique para alterar a imagem</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Clique ou arraste uma imagem
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG ou WebP • Máximo 5MB • 512x512px
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Remove Button */}
      {preview && !isProcessing && (
        <button
          type="button"
          onClick={removeImage}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Remover imagem</span>
        </button>
      )}
    </div>
  );
}
