export default function ItemCart({producto}){
    return (
        <>
            <div className="itemCartImg">
                <img src={producto.imagen} alt={producto.alt}/>
            </div>
            <section>
                <h2>{producto.nombre}</h2>
                <p>{producto.quantity * producto.precio}</p>
                <p>{producto.quantity} unidades</p>
                <p>{producto.descripcionDestacado}</p>
            </section>
        </>
    )
}