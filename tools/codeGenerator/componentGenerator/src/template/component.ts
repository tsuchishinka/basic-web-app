const PROPS_TEMPLATE = `/** {$DESCRIPTION} **/
{$NAME}{$REQUIRED}: {$TYPE}`;

const TYPE_TEMPLATE = `type {$NAME} = {$TYPE}`;

const DEFAULT_TEMPLATE = `{$NAME} {$DEFAULT}`;

const STATE_TEMPLATE = `const [{$NAME}, set{$NAME}] = useState{$TYPE}({$DEFAULT})`;

const EVENT_TEMPLATE = `const {$NAME} = (): {$TYPE} => {}`;

const COMPONENT_TEMPLATE = `import { CSSProperties, ReactNode } from 'react'
import styles from './index.module.scss'
// import clsx from 'clsx'
// import { useState } from 'react'

{$TYPE}

interface Props {
  {$PROPS}
}


const {$NAME} = ({
  {$DEFAULT}
}: Props) => {
  {$STATE}

  {$EVENT}
  return (
    <>
    </>
  )
}

export { {$NAME} }
`;

export {
  PROPS_TEMPLATE,
  COMPONENT_TEMPLATE,
  DEFAULT_TEMPLATE,
  EVENT_TEMPLATE,
  STATE_TEMPLATE,
  TYPE_TEMPLATE,
};
