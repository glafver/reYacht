import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useGameContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const ChooseYacht = () => {
    const { manualChoice, setYachts, setWaiting, userName, socket } = useGameContext()

    const navigate = useNavigate()

    const [tempYacht, setTempYacht] = useState(false)

    const [yachtsLength, setYachtsLength] = useState([4, 3, 2, 2])
    const [tempYachts, setTempYachts] = useState([])
    const [message, setMessage] = useState('Choose your yacht by clicking first on the yacht and then on a game field')

    const getPoints = (length, row_start, col_start, vertical) => {
        let points = [{ row: row_start, col: col_start }];
        // if it is a 2 points ship
        if (length === 2) {
            // and it is horizontal
            if (vertical === "horizontal") {
                // we keep the same row but add another column horizontally
                points.push({ row: row_start, col: col_start + 1 })
            } else {
                // if it is vertical we add another row
                points.push({ row: row_start + 1, col: col_start })
            }
            // do the same for other ships
        } else if (length === 3) {
            if (vertical === "horizontal") {
                points.push({ row: row_start, col: col_start + 1 })
                points.push({ row: row_start, col: col_start + 2 })

            } else {
                points.push({ row: row_start + 1, col: col_start })
                points.push({ row: row_start + 2, col: col_start })
            }
        } else if (length === 4) {
            if (vertical === "horizontal") {
                points.push({ row: row_start, col: col_start + 1 })
                points.push({ row: row_start, col: col_start + 2 })
                points.push({ row: row_start, col: col_start + 3 })

            } else {
                points.push({ row: row_start + 1, col: col_start })
                points.push({ row: row_start + 2, col: col_start })
                points.push({ row: row_start + 3, col: col_start })
            }
        }
        return points;
    }


    const validateAddPoint = (points, row, col) => {
        if (row >= 0 && row < 10 && col >= 0 && col < 10) {
            points.push({ row, col });
        }
    }

    const getBlockedPointes = (points, vertical) => {
        let updated_points = []
        for (let point of points) {
            updated_points.push(point)
        }

        let blocked_points = []

        if (vertical === 'vertical') {
            validateAddPoint(updated_points, points[0].row - 1, points[0].col)
            validateAddPoint(updated_points, points[points.length - 1].row + 1, points[0].col)

            for (let point of updated_points) {
                validateAddPoint(blocked_points, point.row, point.col + 1)
                validateAddPoint(blocked_points, point.row, point.col - 1)
            }

        } else {
            validateAddPoint(updated_points, points[0].row, points[0].col - 1)
            validateAddPoint(updated_points, points[0].row, points[points.length - 1].col + 1)

            for (let point of updated_points) {
                validateAddPoint(blocked_points, point.row + 1, point.col)
                validateAddPoint(blocked_points, point.row - 1, point.col)
            }
        }
        return updated_points.concat(blocked_points);
    }

    const getYacht = (e) => {

        let result = e.target.id.split("_")

        setTempYacht({ length: Number(result[1]), vertical: result[0] })

        for (let cell of document.getElementsByClassName('active')) {
            cell.classList.add('inactive')
            if (cell.classList.contains(e.target.id)) {
                cell.classList.remove('inactive')
            }
        }
    }

    const setYacht = (e) => {
        e.preventDefault()

        e.target.classList.remove('hover_cell')

        let cells = document.getElementsByClassName('inactive')

        while (cells.length) {
            cells[0].classList.remove('inactive')
        }

        if (tempYacht) {

            if (!e.target.classList.contains('blocked')) {
                let yacht = tempYacht

                setTempYacht(false)
                yacht.row = Number(e.target.id[0])
                yacht.col = Number(e.target.id[1])
                yacht.id = e.target.id

                yacht.points = getPoints(yacht.length, yacht.row, yacht.col, yacht.vertical)

                let canDraw = true

                for (let point of yacht.points) {
                    if (0 > point.row || point.row > 9 || 0 > point.col || point.col > 9) {
                        canDraw = false
                        break
                    }

                    for (let yacht of tempYachts) {
                        for (let other_yacht_point of yacht.points) {
                            if (Math.abs(point.row - other_yacht_point.row) <= 1
                                && Math.abs(point.col - other_yacht_point.col) <= 1) {
                                canDraw = false
                                break
                            }
                        }
                    }
                }

                if (canDraw) {

                    yacht.blocked_points = getBlockedPointes(yacht.points, yacht.vertical)

                    for (let point of yacht.blocked_points) {
                        document.getElementById(`${point.row}${point.col}`).classList.add('yacht-neighbour-blocked', 'blocked', `removable_${yacht.vertical}_${yacht.length}`)
                    }

                    for (let point of yacht.points) {
                        document.getElementById(`${point.row}${point.col}`).classList.add('yacht-blocked', 'blocked', `removable_${yacht.vertical}_${yacht.length}`)
                        document.getElementById(`${point.row}${point.col}`).classList.remove('yacht-neighbour-blocked')
                    }

                    tempYachts.push({ length: yacht.length, row_start: yacht.row, col_start: yacht.col, vertical: yacht.vertical, points: yacht.points, blocked_points: yacht.blocked_points, id: yacht.id })

                    yachtsLength.splice(yachtsLength.indexOf(yacht.length), 1)
                    setYachtsLength(yachtsLength)
                    setMessage('Good job!')
                } else {
                    setMessage('You can not place yacht here!')
                }
            }

        }

    }

    const handleSubmit = () => {

        socket.emit('user:joined', userName, tempYachts, (result) => {
            setYachts(result.yachts)
            setWaiting(result.waiting)
        })

        navigate('/game')
    }

    const allowDrop = (e) => {
        if (!e.target.classList.contains('blocked')) {
            e.preventDefault()
        }
    }

    const onDragEnter = (e) => {
        if (!e.target.classList.contains('blocked')) {
            e.target.classList.add('hover_cell')
        }
    }

    const onDragLeave = (e) => {
        if (!e.target.classList.contains('blocked')) {
            e.target.classList.remove('hover_cell')
        }
    }

    const removeYacht = (e) => {

        if (e.target.classList.contains('yacht-blocked')) {

            let found_yacht

            for (let yacht of tempYachts) {
                for (let point of yacht.points) {
                    if (point.row === Number(e.target.id[0]) && point.col === Number(e.target.id[1])) {
                        found_yacht = yacht
                        break
                    }
                }
            }

            found_yacht.points.forEach(point => {
                document.getElementById(`${point.row}${point.col}`).classList.remove('blocked', 'yacht-blocked')
            })

            found_yacht.blocked_points.forEach(point => {
                document.getElementById(`${point.row}${point.col}`).classList.remove('blocked', 'yacht-neighbour-blocked')
            })

            let new_yachts = tempYachts.filter((yacht) => {
                return yacht.id !== found_yacht.id
            })

            yachtsLength.push(found_yacht.length)

            for (let yacht of new_yachts) {
                for (let point of yacht.blocked_points) {
                    document.getElementById(`${point.row}${point.col}`).classList.add('blocked', 'yacht-neighbour-blocked')
                }
            }

            setTempYachts(new_yachts)
        }
    }

    const resetYachts = () => {
        setTempYacht(null)
        let cells = document.getElementsByClassName('inactive')

        while (cells.length) {
            cells[0].classList.remove('inactive')
        }
    }

    return (
        <Modal id="modalManuallyChoose" show={manualChoice}>
            <Modal.Body id="manuallyChoose">
                <div id="chooseYachts">
                    <p id="chooseYachtMsg">{message}</p>

                    <div className="yachts-container mx-auto mb-3" onClick={resetYachts}>
                        <div id="vertical_4" style={{ gridArea: "2 / 2 / span 4 / span 1", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(4) ? 'vertical_4 active' : 'd-none'}>
                        </div>

                        <div id="vertical_3" style={{ gridArea: "2 / 4 / span 3 / span 1", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(3) ? 'vertical_3 active' : 'd-none'}>
                        </div>

                        <div id="vertical_2" style={{ gridArea: "2 / 6 / span 2 / span 1", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(2) ? 'vertical_2 active' : 'd-none'}>
                        </div>

                        <div id="horizontal_4" style={{ gridArea: "2 / 8 / span 1 / span 4", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(4) ? 'horizontal_4 active' : 'd-none'}>
                        </div>

                        <div id="horizontal_3" style={{ gridArea: "4 / 8 / span 1 / span 3", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(3) ? 'horizontal_3 active' : 'd-none'}>
                        </div>

                        <div id="horizontal_2" style={{ gridArea: "6 / 8 / span 1 / span 2", cursor: "pointer" }} draggable onDragStart={getYacht} className={yachtsLength.includes(2) ? 'horizontal_2 active' : 'd-none'}>
                        </div>
                    </div>
                </div>
                <div className="board m-auto mx-auto mb-3" id="boardPlaceYachts">

                    {
                        [...Array(100).keys()].map((div) =>
                            <div key={div} className="board_cell cursor-not-allowed" id={div < 10 ? '0' + div : div} onClick={removeYacht} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={allowDrop} onDrop={setYacht} ></div>
                        )
                    }

                </div>
                <div>
                    <button className="button btn-gold" onClick={handleSubmit} disabled={yachtsLength.length > 0}>Submit the choice</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ChooseYacht