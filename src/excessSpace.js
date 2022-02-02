/**********************************************************************************************************
*   BASE IMPORT
**********************************************************************************************************/
import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';


const focusableElementsSelector = 'button:not([disabled]), [href], input:not([type="checkbox"]):not([tabindex="-1"]), textarea, [tabindex]:not([tabindex="-1"])';

/**********************************************************************************************************
*   COMPONENT START
**********************************************************************************************************/
class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: 0
        };

        this.blockBodyScroll = this.blockBodyScroll.bind(this);
        this.unblockBodyScroll = this.unblockBodyScroll.bind(this);
        this.focusTrapOnKeyDown = this.focusTrapOnKeyDown.bind(this);
        this.trapFocus = this.trapFocus.bind(this);
        this.untrapFocus = this.untrapFocus.bind(this);

        this.overlayRef = createRef();
    }

    blockBodyScroll() {
        const scrollPosition = window.pageYOffset;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        // Stop body from scrolling on older versions of ios
        document.body.style.position = 'fixed';
        // Stop horizontal shift when modal closes
        document.body.style.width = `calc(100% - ${scrollbarWidth}px)`;
        // Stop visible scrolling when modal closes
        document.body.style.top = `-${scrollPosition.toString()}px`;

        this.setState({
            scrollPosition
        });
    }

    unblockBodyScroll() {
        const { scrollPosition } = this.state;

        // Reset all the style properties that were added to the body in bodyScrollBlock
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }

    focusTrapOnKeyDown = e => {
        const { overlayRef } = this;
        const { onClose } = this.props;

        if (e.key === 'Escape') return onClose();

        if (!overlayRef?.current) return;

        const focusableEls = document.querySelectorAll(focusableElementsSelector);
        const focusableElsWithinModal = Array.from(focusableEls).filter(el => overlayRef.current.contains(el));

        const index = focusableElsWithinModal.indexOf(e.target);

        if (e.key === 'Tab' && index >= 0) {
            if (index === focusableElsWithinModal.length - 1 && !e.shiftKey) {
                // Recycle the focus back to the start of the list of focusable elements within the modal
                e.preventDefault();
                focusableElsWithinModal[0].focus();
            } else if (index === 0 && e.shiftKey) {
                // Recycle from first to last if its shift + tab
                e.preventDefault();
                focusableElsWithinModal[focusableElsWithinModal.length - 1].focus();
            }
        }
    }

    trapFocus() {
        const { initialFocus } = this.props;
        const { overlayRef, focusTrapOnKeyDown } = this;

        if (!overlayRef?.current) return;

        const focusableEls = document.querySelectorAll(focusableElementsSelector);
        const focusableElsWithinModal = Array.from(focusableEls).filter(el => overlayRef.current.contains(el));

        // Focus the first focusable element in the modal
        const elToFocus = initialFocus?.current && focusableElsWithinModal.includes(initialFocus.current) ? initialFocus.current : focusableElsWithinModal[0]
        elToFocus.focus();

        // Catch and modify keydown events to make sure focus stays within the modal
        document.addEventListener('keydown', focusTrapOnKeyDown);
    }

    untrapFocus() {
        const { focusTrapOnKeyDown } = this;

        document.removeEventListener('keydown', focusTrapOnKeyDown);
    }

    /************** LIFECYCLE METHODS **************/
    componentDidMount() {
        const { open } = this.props;
        const { blockBodyScroll, trapFocus } = this;

        if (open) {
            blockBodyScroll();
            trapFocus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { open } = this.props;
        const { blockBodyScroll, unblockBodyScroll, trapFocus, untrapFocus } = this;

        // Trap focus and block body scroll when open changes to true
        if (open && !prevProps.open) {
            blockBodyScroll();
            trapFocus();
        }

        // Untrap focus and unblock body scroll when open changes to false
        if (!open && prevProps.open) {
            unblockBodyScroll();
            untrapFocus();
        }
    }

    componentWillUnmount() {
        const { unblockBodyScroll, untrapFocus } = this;

        // Untrap focus and unblock body scroll when modal unmounts
        unblockBodyScroll();
        untrapFocus();
    }

    render() {
        const { open, className, onClose, children, ariaLabel, removeCloseButton } = this.props;
        const { overlayRef } = this;

        /*  Render Component
        **********************************************************************************************************/
        return open ? ReactDOM.createPortal(
            <div className={`Overlay${className}`}>
                <div
                    ref={overlayRef}
                    className="OverlayModal"
                    aria-label={ariaLabel}
                    aria-modal="true"
                    role="dialog"
                >
                    <h1>{window.innerHeight}</h1>
                    {children}
                    {!removeCloseButton && <button className={`OverlayClose`} onClick={onClose}><i className={`icon icon-x`}/></button>}
                </div>
            </div>,
            document.body
        ) : ''
    }
}

/**********************************************************************************************************
*   COMPONENT END
**********************************************************************************************************/
export default Modal;