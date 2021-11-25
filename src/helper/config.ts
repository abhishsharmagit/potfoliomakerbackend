export const filePayload = (
  template: string,
  imageName: string,
  resumeName: string,
) => {
  const imgext = imageName.slice(-3);
  const pdfext = resumeName.slice(-3);
  return [
    {
      readPath: `${template}/js/bundle.js`,
      path: 'js/bundle.js',
      message: 'conatct file created',
      fileName: 'bundle.js',
    },
    {
      readPath: `${template}/js/credentials.json`,
      path: 'js/credentials.json',
      message: 'conatct file created',
      fileName: 'credentials.json',
    },
    {
      readPath: `images/portfolioImage.${imgext}`,
      path: `images/portfolioImage.${imgext}`,
      message: 'image file created',
      fileName: `portfolioImage.${imgext}`,
    },
    {
      readPath: `resume/resume.${pdfext}`,
      path: `resume/resume.${pdfext}`,
      message: 'resume file created',
      fileName: `resume.${pdfext}`,
    },
    {
      readPath: `${template}/index.html`,
      path: 'index.html',
      message: 'conatct file created',
      fileName: 'index.html',
    },
  ];
};
