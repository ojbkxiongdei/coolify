// 声明Pixar风格转换相关组件的类型

declare module '@/components/PixarStyleConverter' {
  export interface PixarStyleConverterProps {
    onImagesConverted: (images: string[]) => void;
  }
  
  const PixarStyleConverter: React.FC<PixarStyleConverterProps>;
  export default PixarStyleConverter;
}

declare module '@/components/PixarStyleConverterClient' {
  const PixarStyleConverterClient: React.FC;
  export default PixarStyleConverterClient;
}

declare module '@/components/PixarStyleConverterSEO' {
  const PixarStyleConverterSEO: React.FC;
  export default PixarStyleConverterSEO;
} 