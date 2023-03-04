import 'cleave.js/dist/addons/cleave-phone.i18n';

import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import type { Props as PropsCleave } from 'cleave.js/react/props';
import type {
  ChangeEvent,
  Component,
  InputHTMLAttributes,
  LegacyRef,
  ReactElement,
} from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { ArrowSmall, Check, Search } from '../../icons';
import type { Triggers } from '../../types';
import { convertToAsciiString, onlySpaces, prefix } from '../../utils';
import { CFormInput } from '../form';

export interface OptionNumber {
  code: string;
  name: string;
  prefix: string;
}

const defaultPhone: OptionNumber = {
  prefix: '+84',
  code: 'VN',
  name: 'Viet Nam',
};

export interface PhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  trigger?: Triggers | Triggers[];
  label?: string;
  error?: string;
  onGetPrefix?: (val: string) => void;
  defaultCountry?: string;
}

export const CPhoneNumber = forwardRef(function Phone(
  {
    trigger = 'click',
    onGetPrefix,
    error,
    label,
    defaultCountry,
    ...props
  }: PhoneProps,
  refs: LegacyRef<Component<PropsCleave>>
): ReactElement {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const squareBoxRef = useRef<HTMLLIElement>(null);

  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [select, setSelect] = useState<OptionNumber>({} as OptionNumber);
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState<OptionNumber[]>(prefix);

  useEffect(() => {
    const country =
      prefix.find((val) => val.code === defaultCountry) || defaultPhone;
    setSelect(country);
  }, [defaultCountry]);

  const triggers = {
    ...((trigger === 'click' || trigger.includes('click')) && {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (props.disabled) return;
        const setIndexPrefix = prefix.map((v) => v.code).indexOf(select.code);

        setFocusedIndex(setIndexPrefix);
        setVisible(!visible);
      },
    }),
    ...((trigger === 'focus' || trigger.includes('focus')) && {
      onFocus: () => {
        if (props.disabled) return;
        setVisible(true);
      },
      onBlur: () => setVisible(false),
    }),
  };

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = listData[selectedIndex];
    setVisible(false);
    setListData(prefix);
    setSelect(selectedItem);
  };

  const handleHover: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const { type } = e;
    if (type.toLowerCase() === 'mouseover') {
      setFocusedIndex(-1);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;
    // move down
    if (key === 'ArrowDown')
      nextIndexCount = (focusedIndex + 1) % listData.length;
    // move up
    if (key === 'ArrowUp')
      nextIndexCount = (focusedIndex + listData.length - 1) % listData.length;
    // select the current item
    if (key === 'Enter') {
      e.preventDefault();
      if (listData.length > 0) {
        handleSelection(focusedIndex);
      }
    }
    setFocusedIndex(nextIndexCount);
  };

  const togglerProps = {
    'aria-expanded': visible,
    ...triggers,
  };

  const handleMouseUp = (event: any) => {
    const { target } = event;
    if (!dropdownMenuRef.current?.contains(target as HTMLElement)) {
      setTimeout(() => setVisible(false), 1);
      setListData(prefix);
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setVisible(false);
      setListData(prefix);
    }
  };

  useEffect(() => {
    if (visible) window.addEventListener('mouseup', handleMouseUp);
    if (visible) window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [visible]);

  useEffect(() => {
    if (onGetPrefix) onGetPrefix(select.prefix);
  }, [select]);

  useEffect(() => {
    if (!squareBoxRef.current) return;
    squareBoxRef.current.scrollIntoView({
      block: 'center',
    });
  }, [focusedIndex, visible]);

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (onlySpaces(value)) {
      setListData(prefix);
    } else {
      const newSearch = prefix.filter((val) => {
        return (
          convertToAsciiString(
            (val.prefix + val.code + val.name).toLowerCase()
          ).indexOf(convertToAsciiString(value.trim().toLowerCase())) > -1
        );
      });
      setListData(newSearch);
    }
  };

  return (
    <Manager>
      <div
        className="ctn-phone-number"
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      >
        {label && (
          <div className="mb-2">
            <p className="inline-block text-base font-normal leading-6 text-inks-6">
              {label}
            </p>
            {props.required && <span>*</span>}
          </div>
        )}
        <Reference>
          {({ ref }) => (
            <div
              className={classNames(
                props.disabled && 'phone-header-disable',
                error && 'phone-header-error shadow-error',
                !props.disabled &&
                  !error &&
                  'phone-header-normal dropdown-shadow-normal'
              )}
              ref={ref}
            >
              <div className="btn-search" {...togglerProps}>
                <div className="h-[18px] w-[24px] shrink-0 ml-[2px]">
                  <i
                    className={classNames('flag', select?.code?.toLowerCase())}
                  />
                </div>
                <p
                  className={classNames(
                    props.disabled && 'text-ic-ink-5',
                    'text-prefix'
                  )}
                >
                  {select?.prefix}
                </p>
                <ArrowSmall
                  color={props.disabled ? '#666666' : '#333333'}
                  className="ml-[2px]"
                />
              </div>
              <div className="line-phone"></div>
              <Cleave
                placeholder="Phone number"
                options={{
                  phone: true,
                  phoneRegionCode: select.code,
                }}
                className={classNames(
                  props.disabled && 'text-ic-ink-5',
                  'w-full text-inks-6 outline-none bg-transparent text-base font-normal leading-6  placeholder:text-inks-4'
                )}
                {...props}
                ref={refs}
              />
            </div>
          )}
        </Reference>

        {error && (
          <p className="mx-4 mt-1 text-reds-6 text-sm font-normal leading-5">
            {error}
          </p>
        )}
        {visible && (
          <Popper placement="bottom" innerRef={dropdownMenuRef}>
            {(prop) => (
              <div
                ref={prop.ref}
                style={prop.style}
                data-placement={prop.placement}
                className={classNames('box-shadow phone-body')}
              >
                <div className="mb-1">
                  <CFormInput
                    size="small"
                    onChange={onHandleSearch}
                    datatype="searchPhoneNumber"
                    autoFocus={true}
                    placeholder="Search..."
                    right={<Search />}
                    hiddenClose={true}
                  />
                </div>
                <ul className="list-phone scroll">
                  {listData.length > 0 &&
                    listData.map((val, index) => {
                      return (
                        <li
                          className={classNames(
                            'phone-items',

                            index === focusedIndex && 'bg-ic-ink-1'
                          )}
                          key={val.code}
                          onClick={() => {
                            setSelect(val);
                            setVisible(false);
                            setListData(prefix);
                          }}
                          onMouseOver={handleHover}
                          ref={index === focusedIndex ? squareBoxRef : null}
                        >
                          <div className="flex items-center ">
                            <div className="h-[18px] w-[24px] shrink-0 ">
                              <i
                                className={classNames(
                                  'inline-block rounded w-full h-full',
                                  val.code.toLowerCase()
                                )}
                              />
                            </div>
                            <a className="ml-2">
                              {val.prefix} {`(${val.name})`}
                            </a>
                          </div>
                          {select.code === val.code && <Check />}
                        </li>
                      );
                    })}
                  {listData.length <= 0 && (
                    <li className="phone-items">No result found</li>
                  )}
                </ul>
              </div>
            )}
          </Popper>
        )}
      </div>
    </Manager>
  );
});
