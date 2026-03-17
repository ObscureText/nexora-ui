export const delay = (mills: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, mills));
};
