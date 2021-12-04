import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
          {/* Este script es para google maps */}
          <script
            async
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
          ></script>
          {/* <script
            src="//widget.cloudinary.com/global/all.js"
            type="text/javascript"
          ></script> */}
          <script
            src="https://upload-widget.cloudinary.com/global/all.js"
            type="text/javascript"
          ></script>
          <script src="https://media-library.cloudinary.com/global/all.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
