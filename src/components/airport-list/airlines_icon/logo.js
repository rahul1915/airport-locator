//Color code changes with Airlines code.
import Colors from './colors.json'

//Component
const Logo = (props) => {
  return (
    <div style={{
      height: '61px',
      width: '61px',
      marginTop: '10px',
      marginRight: '57px',
      marginLeft: '-26px'
    }}>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="350"
        style={props.style}
        viewBox="0 0 841.9 841.9"><g fill={Colors[props.id] || props.color}><path
          fillRule="nonzero"
          stroke="none"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeWidth="1"
          d="M45 0C20.187 0 0 20.187 0 45s20.187 45 45 45 45-20.187 45-45S69.813 0 45 0zm21.492 30.116L55.869 40.738a2.68 2.68 0 00-.729 2.46l4.538 21.467a2.85 2.85 0 01-.774 2.607l-1.607 1.607a2.837 2.837 0 01-2.547.786 2.85 2.85 0 01-2.084-1.66l-6.948-15.887a.617.617 0 00-.464-.37.621.621 0 00-.568.176l-4.268 4.267a.834.834 0 00-.208.833l1.266 4.155a2.397 2.397 0 01-.598 2.392l-1.659 1.659c-.554.553-1.347.8-2.109.665a2.391 2.391 0 01-1.755-1.343l-3.135-6.687-6.818-3.196a2.399 2.399 0 01-.677-3.864l1.659-1.659a2.388 2.388 0 012.392-.599l4.155 1.267a.832.832 0 00.832-.208l4.303-4.302a.62.62 0 00.175-.568.618.618 0 00-.37-.465l-15.887-6.948a2.853 2.853 0 01-.874-4.63l1.608-1.609a2.838 2.838 0 012.607-.773l21.467 4.537a2.684 2.684 0 002.458-.729l10.54-10.54c1.785-1.785 4.63-1.915 6.478-.295a4.645 4.645 0 011.594 3.371 4.71 4.71 0 01-1.37 3.461z"
          opacity="1"
          transform="matrix(3.89 0 0 3.89 -1.944 -1.944)"
        ></path>
        <text alignmentBaseline="baseline" fontSize="8em" x="350" y="350">{props.id}</text>
        </g>
      </svg>
    </div>);
}

export default Logo;