
export class Helpers {

    /**
   * Copy Css links to new page
   * @param printWindow
   */
   public static copyCss(printWindowDoc: Document) {

    const links = document.querySelectorAll('link');
    const styles = document.querySelectorAll('style');
    const base = document.querySelector('base');

    const targetHead = printWindowDoc.getElementsByTagName('head')[0];

    if (base) {
      targetHead.appendChild(document.importNode(base, true));
    }

    links.forEach(link => {
      targetHead.appendChild(document.importNode(link, true));
    });

    styles.forEach(style => {
      targetHead.appendChild(document.importNode(style, true));
    });
  }

}

