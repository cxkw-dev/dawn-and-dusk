import pkg from '../../package.json';
export const version = pkg.version;
export const releaseUrl = `https://github.com/cxkw-dev/dawn-and-dusk/releases/download/v${version}`;
export const packageUrl = `${releaseUrl}/dawn-and-dusk-${version}.tgz`;
export const installCommand = `npm install ${packageUrl}`;
export const starterUrl = (kind: 'html' | 'react' | 'next') => `${releaseUrl}/dawn-and-dusk-${kind}-${version}.zip`;
