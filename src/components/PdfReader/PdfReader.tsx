import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PdfReader.module.scss';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { Progress } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function PdfReader() {
  const file =
    'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf';

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setRenderedPages(new Set());
  }

  function onRenderSuccess(pageNumber: number): void {
    setRenderedPages((prevRenderedPages) =>
      new Set(prevRenderedPages).add(pageNumber)
    );
  }

  const readingProgress = numPages ? (renderedPages.size / numPages) * 100 : 0;

  return (
    <div className="PDF">
      <div className="PDF__container">
        <Progress
          percent={readingProgress}
          status="active"
          style={{ marginBottom: '16px' }}
        />
        <div className="PDF__container__document" ref={setContainerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`}>
                <div>Page: {index + 1}</div>
                <Page
                  pageNumber={index + 1}
                  width={
                    containerWidth
                      ? Math.max(containerWidth, maxWidth)
                      : maxWidth
                  }
                  onRenderSuccess={() => onRenderSuccess(index + 1)}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
