export interface InvoiceI {
    id?: number,
    code: string,
    invoiceDate?: any,
    customerId: number,
    subtotal?: number,
    iva?: number,
    total?: number,
    invoiceDetails?: any[],
    state: boolean,
}