  export const MenuI = ({
    className,
    fill = "currentColor",
    width = "24",
    height = "24"
  }) => {
  return (
    <svg  
        xmlns="http://www.w3.org/2000/svg"  
        width={width}  
        height={height} 
        viewBox="0 0 24 24"  
        fill="none"  
        stroke={fill}  
        stroke-width="2"  
        stroke-linecap="round"  
        stroke-linejoin="round"  
        class="icon icon-tabler icons-tabler-outline icon-tabler-category">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 4h6v6h-6z" />
      <path d="M14 4h6v6h-6z"/>
      <path d="M4 14h6v6h-6z" />
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
    </svg>
  )
}
