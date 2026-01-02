const fromEnv = (key: string, fallback: string) => process.env[key] || fallback;

export const APP_NAME = fromEnv('REACT_APP_NAME', 'LAUTECH');
export const APP_LOGO_PATH = fromEnv('REACT_APP_LOGO_PATH', '/lautech-logo.jpg');
