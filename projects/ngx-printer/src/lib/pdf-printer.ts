export class PdfPrinter {


 constructor(fileLink: string) {
  const newBlob = new Blob(['<h1>Hello</h1>'], {
    type: 'text/html'
  });

   const fileLinkUrl = window.URL.createObjectURL(newBlob);
  const iframe = document.createElement('iframe');
  
  iframe.src = fileLink;
  iframe.id = 'print_pdf';
  iframe.name = 'print_pdf';
  // iframe.style.display = 'none'
  
  setTimeout(
  
    () => { this.setOnLoad(iframe);
        document.body.appendChild(iframe);
    },
   1000);

 }

    private setOnLoad(iframe: HTMLIFrameElement) {
        iframe.onload = () => {
            iframe.contentWindow.addEventListener('afterprint', () => {
                document.body.removeChild(iframe);
                alert('ready');
            });
            window.frames['print_pdf'].focus();
            window.frames['print_pdf'].print();
        };
    }
}
