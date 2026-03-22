import QRCode from 'qrcode';

export async function QrCodePlaceholder({
  size = 200,
  value = 'CAMPUS-PREORDER-DEMO',
  title = 'Order QR Code',
}: {
  size?: number;
  value?: string;
  title?: string;
}) {
  const markup = await QRCode.toString(value, {
    errorCorrectionLevel: 'M',
    margin: 1,
    type: 'svg',
    width: size,
    color: {
      dark: '#082032',
      light: '#FFFFFF',
    },
  });

  return (
    <div className="rounded-[1.5rem] border border-primary/10 bg-white p-4 shadow-lg shadow-primary/10">
      <div
        aria-label={title}
        className="overflow-hidden rounded-xl"
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </div>
  );
}
