# ألوان الكناري OEE — Starter Architecture

نظام PWA لإدارة خطوط الإنتاج، التوقفات، العمالة، الإنتاج، الجودة، وحساب OEE.

## Stack
- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui + ECharts/Recharts
- Offline: IndexedDB عبر Dexie + Service Worker + Sync Queue
- State/Data: TanStack Query + Zustand
- Backend: NestJS + Prisma + PostgreSQL
- Realtime: Socket.IO + Redis
- Security: JWT/refresh cookies + Argon2 + RBAC
- Exports: ExcelJS + Playwright/PDF
- Files: S3/MinIO
- Validation: Zod / class-validator

## OEE
Availability = Run Time / Planned Production Time
Performance = Ideal Cycle Time × Total Count / Run Time
Quality = Good Count / Total Count
OEE = Availability × Performance × Quality

> بيانات كلمات المرور الافتراضية المذكورة في المتطلبات يجب اعتبارها بيانات تطوير فقط.
> في الإنتاج يجب فرض تغييرها عند أول دخول وتخزينها Hash وليس كنص صريح.
