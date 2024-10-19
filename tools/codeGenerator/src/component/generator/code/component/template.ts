const PROPS_DESCRIPTION_TEMPLATE = `/** {$DESCRIPTION} **/`;

const PROPS_TYPE_TEMPLATE = `: {$TYPE}`;

const PROPS_TEMPLATE = `{$PROPS_DESCRIPTION}
  {$NAME}{$REQUIRED}{$PROPS_TYPE}`;

const TYPE_TEMPLATE = `type {$NAME} = {$TYPE}`;

const DEFAULT_VALUE_TEMPLATE = ` = {$VALUE}`;

const DEFAULT_TEMPLATE = `{$NAME}{$DEFAULT_VALUE}`;

const STATE_TYPE_TEMPLATE = `<{$TYPE}>`;

const STATE_TEMPLATE = `const [{$NAME}, {$SET_NAME}] = useState{$STATE_TYPE}({$DEFAULT})`;

const EVENT_RETURN_TYPE_TEMPLATE = `: {$TYPE}`;

const EVENT_TEMPLATE = `const {$NAME} = {$ASYNC}({$ARG_TYPE}){$RETURN_TYPE} => {
  // 処理を記述
}`;

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
      {/** JSXを記述 **/}
    </>
  )
}

export { {$NAME} }
`;

export {
  COMPONENT_TEMPLATE,
  DEFAULT_TEMPLATE,
  DEFAULT_VALUE_TEMPLATE,
  EVENT_RETURN_TYPE_TEMPLATE,
  EVENT_TEMPLATE,
  PROPS_DESCRIPTION_TEMPLATE,
  PROPS_TEMPLATE,
  PROPS_TYPE_TEMPLATE,
  STATE_TEMPLATE,
  STATE_TYPE_TEMPLATE,
  TYPE_TEMPLATE,
};
