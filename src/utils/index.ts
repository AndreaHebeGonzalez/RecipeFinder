
export const getHeight = (element: HTMLElement | null) => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect()
    const height = rect.height;
    console.log('altura', height)
    return parseFloat(height.toFixed(2))
}

export const getPadding = (element: HTMLElement | null) => {
    if (!element) return 0;
    const style = window.getComputedStyle(element);
    return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    
};

export const getGap = (element: HTMLElement | null) => {
    if(!element) return 0
    const style = window.getComputedStyle(element)
    return parseFloat(style.rowGap)
}