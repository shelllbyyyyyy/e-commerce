-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('credit_card', 'bank_transfer', 'qris', 'direct_debit', 'cstore', 'gopay', 'shopeepay', 'echannel', 'bca_klikpay', 'bca_klikbca', 'cimb_clicks', 'uob_ezpay');

-- CreateTable
CREATE TABLE "billing" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "payment" "PaymentMethod" NOT NULL,
    "status" "BillingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" UUID NOT NULL,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billing_orderId_key" ON "billing"("orderId");

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
