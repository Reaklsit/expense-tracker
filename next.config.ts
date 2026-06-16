/** @type {import('next').NextConfig} */
const nextConfig = {
  // Добавьте эту строку, чтобы Turbopack не пытался тянуть БД в клиентский бандл
  serverExternalPackages: ['@prisma/client', 'pg'],
  
  // ... любые другие настройки, которые у вас тут уже есть
};

export default nextConfig;