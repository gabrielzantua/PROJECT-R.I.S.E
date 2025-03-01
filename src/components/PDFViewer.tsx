interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <iframe
      src={pdfUrl}
      className="w-full h-full"
      style={{ border: 'none' }}
      title="PDF Document"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts"
    />
  );
}