
export default function Square({ coord, value, onSquareClick }) {
    const decoration = value ? 'on' : 'off';

    return (
        <button className={'square ' + decoration} onClick={() => onSquareClick(coord)}>
            {value}
        </button>
    );
}