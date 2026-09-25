import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the current orvann.com URLs exactly (e.g. /about-us/, /our-projects/akam/),
  // so existing links and search results keep working without redirects.
  trailingSlash: true,

  // The WordPress site's Arabic pages had their own slugs; send each to its new page.
  async redirects() {
    return [
      { source: "/ar/home-ar/", destination: "/ar/", permanent: true },
      { source: "/ar/about-us-ar/", destination: "/ar/about-us/", permanent: true },
      { source: "/ar/services-ar/", destination: "/ar/services/", permanent: true },
      { source: "/ar/contact-ar/", destination: "/ar/contact-us/", permanent: true },
      { source: "/ar/privacy-policy-ar/", destination: "/ar/privacy-policy/", permanent: true },
      // المعارض-والمؤتمرات (exhibitions and conferences), percent-encoded as browsers send it.
      {
        source: "/ar/%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D9%88%D8%A7%D9%84%D9%85%D8%A4%D8%AA%D9%85%D8%B1%D8%A7%D8%AA/",
        destination: "/ar/exhibitions-conferences/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
