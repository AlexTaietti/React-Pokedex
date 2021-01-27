export function withConditionalFadeIn = (Component, mountedOnce) => (props) => {

  return <Component animated={ mountedOnce ? false : true } {...props}/>;

}
