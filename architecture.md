# المعمارية التشغيلية

## الطبقات
1. PWA UI: صفحات حسب الدور.
2. Offline Data Layer: Dexie/IndexedDB + Sync Queue.
3. API: NestJS REST.
4. Realtime: Socket.IO عبر Redis Adapter.
5. Database: PostgreSQL.
6. Files: S3/MinIO.
7. Reporting: Query/Materialized Views + Excel/PDF workers.

## تدفق المشغل
المشغل -> IndexedDB -> واجهة فورية -> Sync Queue -> API -> PostgreSQL
وعند الاتصال: API -> Socket.IO -> شاشة المشرف والإدارة.

## Audit Trail
كل تعديل على Downtime لا يستبدل السجل بصمت؛ ينشئ Version جديداً ويربطه بـ previousVersionId،
مع AuditLog يحتوي actor/entity/action/before/after/timestamp.

## صلاحيات
- ADMIN: إدارة كاملة.
- EXECUTIVE_READONLY: قراءة وتقارير.
- PRODUCTION_MANAGER / MAINTENANCE_MANAGER: قراءة + طباعة + تصدير.
- LINE_SUPERVISOR / SHIFT_SUPERVISOR / DEPUTY_PRODUCTION_MANAGER: اعتماد الوردية وملاحظات إدارية.
- OPERATOR: machineId واحد فقط، ولا يرى بيانات آلات أخرى.

## خطوط الإنتاج
Production:
- الغازي 1: تعبئة غازي 1، نفخ آلي 2، ليبل غازي 1، شرنك غازي 1
- الغازي 2: تعبئة غازي 2، نفخ آلي 3، ليبل غازي 2، شرنك غازي 2
- كانجو 1: تعبئة كانجو 1، نفخ آلي 1، ليبل كانجو 1، شرنك كانجو 1
- كانجو 2: تعبئة كانجو 2، نفخ آلي 4، ليبل كانجو 2، شرنك كانجو 2
- الحلو الرياضي: تعبئة حلو رياضي، ليبل حلو رياضي

Tetrapak:
1-5: عصير 200 مل
6-7: عصير 125 مل
8: عصير 250 مل
9: عصير 330 مل أبو غطاء
10: فينو 200 مل قراطيس
التغليف: شرنك كروز 1، شرنك كروز 2
