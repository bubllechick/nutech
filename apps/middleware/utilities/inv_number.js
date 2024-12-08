
exports.invoceNumber = async (data) => {
    function getLastInvoiceNumber(data) {
        if (!data || data.length === 0) {
            return false;
        }

        const sortedTransactions = data.sort((a, b) => {
            const dateA = new Date(a.dataValues.createdAt);
            const dateB = new Date(b.dataValues.createdAt);
            return dateB - dateA; 
        });

        const lastInvoiceNumber = sortedTransactions[0]?.dataValues?.invoice_number || null;
        return lastInvoiceNumber

    }


    const generateInvoiceNumber = async () => {
        const prefix = "INV";
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const datePart = `${day}${month}${year}`;

        const lastInvoice = await getLastInvoiceNumber(data);

        let newCounter = "001";

        if (lastInvoice) {
            const lastDate = lastInvoice.slice(3, 11);
            const lastCounter = lastInvoice.split("-")[1];

            if (lastDate === datePart) {
                newCounter = String(Number(lastCounter) + 1).padStart(3, "0");
            }
            return `${prefix}${datePart}-${newCounter}`;
        }
    }

    const number_inv = await generateInvoiceNumber()

    return number_inv
}