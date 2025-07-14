import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Expected props shape: { isOpen: boolean, onClose: function, unitData: any (optional) }
const PreviewModal = ({ isOpen, onClose, unitData }) => {
  const [previewData, setPreviewData] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState({});
  const [audioPlaying, setAudioPlaying] = React.useState({});

  React.useEffect(() => {
    if (isOpen) {
      if (unitData) {
        setPreviewData(unitData);
      } else if (typeof window.getPreviewContent === 'function') {
        const data = window.getPreviewContent();
        setPreviewData(data);
      }
    }
  }, [isOpen, unitData]);

  const renderBlockContent = (block, index) => {
    const { type, content } = block;

    // Multimedia blocks
    if (type.startsWith('multimedia-')) {
      const { multimediaType, title, url, description, duration, alt, fileSize, fileName, embedCode } = content;
      const blockKey = `multimedia-${index}`;
      
      switch (multimediaType) {
        case 'audio':
          const isPlaying = audioPlaying[blockKey] || false;
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => setAudioPlaying(prev => ({
                      ...prev,
                      [blockKey]: !isPlaying
                    }))}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: isPlaying ? '45%' : '0%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{isPlaying ? '01:23' : '00:00'}</span>
                      <span>{duration || '03:45'}</span>
                    </div>
                  </div>
                  
                  <Volume2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        
        case 'video':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                {url ? (
                  <video controls className="w-full h-full rounded-lg">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center text-white">
                    <Play className="h-12 w-12 mx-auto mb-2 opacity-70" />
                    <p className="text-sm opacity-70">Video player</p>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'embedded':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="rounded-lg border overflow-hidden">
                {embedCode || url ? (
                  <div 
                    className="w-full min-h-[300px] rounded-lg"
                    dangerouslySetInnerHTML={{ __html: embedCode || `<iframe src="${url}" width="100%" height="300" frameborder="0"></iframe>` }}
                  />
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">Embedded content placeholder</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'attachment':
          return (
            <div className="my-6">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{fileName || title || 'Attachment'}</p>
                    {fileSize && (
                      <p className="text-xs text-gray-500">{fileSize}</p>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          );
        
        case 'image':
          return (
            <div className="my-8">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
              )}
              <div className="rounded-lg overflow-hidden">
                {url ? (
                  <img 
                    src={url} 
                    alt={alt || 'Content image'} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">Image placeholder</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        
        case 'document':
          return (
            <div className="my-6">
              {title && <h4 className="font-semibold text-gray-900 mb-3 text-lg">{title}</h4>}
              {description && (
                <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{title || 'Document.pdf'}</p>
                    {fileSize && (
                      <p className="text-xs text-gray-500">{fileSize}</p>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="my-8 text-center text-gray-600">
              <p className="font-medium">{multimediaType}</p>
              <p className="text-sm">Multimedia content preview</p>
            </div>
          );
      }
    }

    // Text blocks
    if (type.startsWith('text')) {
      const { textType, text, heading, subheading, tableData } = content;
      
      switch (textType) {
        case 'paragraph':
          return (
            <div className="my-6">
              <p className="text-gray-700 leading-relaxed text-base">
                {text || 'Sample paragraph text goes here.'}
              </p>
            </div>
          );
        case 'heading-paragraph':
          return (
            <div className="my-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {heading || 'Main Heading'}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {text || 'Content for this section goes here.'}
              </p>
            </div>
          );
        case 'subheading-paragraph':
          return (
            <div className="my-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {subheading || 'Subheading'}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {text || 'Content for this section goes here.'}
              </p>
            </div>
          );
        case 'table':
          if (!tableData?.headers || !tableData?.rows) {
            return <div className="my-6 text-gray-500 text-center">Sample table would appear here</div>;
          }
          return (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    {tableData.headers.map((header, i) => (
                      <th key={i} className="border border-gray-300 px-4 py-2 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">Text content preview</div>;
      }
    }

    // List blocks
    if (type.startsWith('list')) {
      const { listType, items } = content;
      
      if (!items || items.length === 0) {
        return <div className="my-6 text-gray-500">No list items</div>;
      }

      switch (listType) {
        case 'bullet':
          return (
            <div className="my-6">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        case 'numbered':
          return (
            <div className="my-6">
              <ol className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-blue-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        case 'checklist':
          return (
            <div className="my-6">
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-5 h-5 border-2 border-green-500 rounded mr-3 mt-0.5 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">List content preview</div>;
      }
    }

    // Quote blocks
    if (type.startsWith('quote')) {
      const { quoteType, text, author, source } = content;
      
      switch (quoteType) {
        case 'simple':
          return (
            <div className="my-8">
              <blockquote className="border-l-4 border-blue-500 pl-6 py-2">
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  "{text || 'Sample quote text goes here.'}"
                </p>
                {author && (
                  <footer className="mt-3 text-sm text-gray-600">
                    — {author}
                    {source && <span>, {source}</span>}
                  </footer>
                )}
              </blockquote>
            </div>
          );
        case 'highlighted':
          return (
            <div className="my-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-blue-900 leading-relaxed font-medium">
                  "{text || 'Sample highlighted quote text goes here.'}"
                </p>
                {author && (
                  <footer className="mt-4 text-sm text-blue-700">
                    — {author}
                    {source && <span>, {source}</span>}
                  </footer>
                )}
              </div>
            </div>
          );
        default:
          return <div className="my-6 text-gray-500">Quote content preview</div>;
      }
    }

    // Callout blocks
    if (type.startsWith('callout')) {
      const { calloutType, title, text } = content;
      
      const calloutStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900'
      };
      
      const style = calloutStyles[calloutType] || calloutStyles.info;
      
      return (
        <div className="my-8">
          <div className={`border-l-4 p-6 rounded-r-lg ${style}`}>
            {title && (
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
            )}
            <p className="leading-relaxed">
              {text || 'Sample callout text goes here.'}
            </p>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="my-6 text-gray-500 text-center">
        <p>Content block preview</p>
      </div>
    );
  };

  if (!previewData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No content to preview</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {previewData.title || previewData.settings?.title || 'Preview'}
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]">
          <div className="py-8 px-2">
            <article className="prose prose-lg max-w-none">
              {previewData.blocks && previewData.blocks.length > 0 ? (
                previewData.blocks.map((block, index) => (
                  <div key={block.id || index}>
                    {renderBlockContent(block, index)}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No content blocks added yet.</p>
                  <p className="text-sm mt-2">Add some content blocks to see the preview.</p>
                </div>
              )}
            </article>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export { PreviewModal };