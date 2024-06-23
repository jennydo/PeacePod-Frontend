const StyledDivider = ({direction}) => {
    return ( 
    <div 
        className={`styled-divider ${direction === 'vertical' ? 'vertical' : 'horizontal'}`}>
    </div> 
    );
}
 
export default StyledDivider;