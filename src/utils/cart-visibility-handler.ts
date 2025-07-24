import { useState, useRef, useEffect, useCallback } from "react";

export default function componentVisibilityHandler(intialVisibleState: boolean) {
    const [isVisible, setIsVisible] = useState<boolean>(intialVisibleState);

    const componentRef = useRef<HTMLInputElement>(null);

    // apply event to ref
    const refEventHandler = useCallback((e: MouseEvent) => {
        if(componentRef.current && !componentRef.current.contains(e.target as Node)) {
            setIsVisible(false)
        }
    }, []);

    // apply event to 'add to cart' btn
    const addToCartEventHandler = useCallback((e: MouseEvent) => {
        // event delegation at document level - find each button
        if((e.target as HTMLElement).closest('.cart-add')) {
            setIsVisible(true)
        }
    }, []);

    useEffect(() => {        
        document.addEventListener('click', refEventHandler, true)
        document.addEventListener('click', addToCartEventHandler, true)

        return () => {
            document.removeEventListener('click', refEventHandler, true)
            document.removeEventListener('click', addToCartEventHandler, true)
        }
    }, [refEventHandler, addToCartEventHandler])

    return { componentRef, isVisible, setIsVisible }
} 