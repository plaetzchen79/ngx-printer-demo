export class PdfPrinter {


 constructor(fileLink: string) {
  const newBlob = new Blob(['<h1>Hello</h1>'], {
    type: 'text/html'
  });

   const fileLinkUrl = window.URL.createObjectURL(newBlob);
  const iframe = document.createElement('iframe');
  

  iframe.id = 'print_pdf';
  iframe.name = 'print_pdf';


  // iframe.style.display = 'none'
  
  setTimeout(
  
    () => { this.setOnLoad(iframe);
        iframe.src = fileLink;
        document.body.appendChild(iframe);

        for (let i = 1; i < 10; i++) {
            let done = false;
            setTimeout(
                () => {
                    if (iframe.contentDocument.childNodes.length > 0 && !done) {
                        const first = <HTMLEmbedElement>  iframe.contentDocument.childNodes[1].childNodes[1].firstChild;
                        const svg = first.getSVGDocument();
                        this.setPrintEvent(iframe);
                        console.log('yes');
                        done = true;
                    }
                },
               100);
          }
    },
   500);

 }

    private setOnLoad(iframe: HTMLIFrameElement) {
        iframe.onload = () => {
            this.setPrintEvent(iframe);
        };
    }

    private setPrintEvent(iframe: HTMLIFrameElement) {
        iframe.contentWindow.addEventListener('afterprint', () => {
            document.body.removeChild(iframe);
            alert('ready');
        });
        window.frames['print_pdf'].focus();
        window.frames['print_pdf'].print();
    }
}
