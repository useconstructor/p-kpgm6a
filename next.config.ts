import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  outputFileTracingIncludes: {'/*':['./migrations/*.sql']},
};
export default nextConfig;
