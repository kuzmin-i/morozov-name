const ObjectInfo = (props) => {
    const left = (props.left) ? props.left - 100 : 0
    const top = (props.top) ? props.top - 60 : 0

    const display = (props.display) ? 'block' : 'none'

    const title = (props.title) ? props.title : 'Название объекта'

    return (
    <div style={{ position: 'fixed', display: display, color: 'white', padding: '15px 30px', background: 'rgba(0, 0, 0, .5)', margin: top + 'px auto auto ' + left + 'px', left: 0, top: 0 }}>
        {title}
    </div>
    )
}

export default ObjectInfo 