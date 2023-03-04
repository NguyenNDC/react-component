import classNames from 'classnames';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { ArrowMedium, Check, Search } from '../../../icons';
import type { Triggers } from '../../../types';
import { convertToAsciiString, onlySpaces } from '../../../utils';
import { CFormInput } from '../CFormInput';

export type Option = {
  disabled?: boolean;
  label?: string;
  value?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};
type CFormSelectProps = {
  className?: string;
  onGetValue?: (val: Option) => void;
  options?: Option[];
  value?: string | string[] | number;
  isSearch?: boolean;
  trigger?: Triggers | Triggers[];
  error?: string;
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

// eslint-disable-next-line react/display-name
export const CFormSelect = forwardRef<HTMLInputElement, CFormSelectProps>(
  (
    { isSearch, onGetValue, options, error, trigger = 'click', label, ...rest },
    refs
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const squareBoxRef = useRef<HTMLLIElement>(null);

    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState<Option>({
      label: '',
      value: '0',
    } as Option);
    const [search, setSearch] = useState<string>('');
    const [listData, setListData] = useState<Option[]>(options || []);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const setInputRef = useCallback(
      (inputElement: HTMLInputElement | null) => {
        inputRef.current = inputElement;

        if (!refs) {
          return;
        }

        if (typeof refs === 'object') {
          refs.current = inputElement;
        }

        if (typeof refs === 'function') {
          refs(inputElement);
        }
      },
      [refs]
    );

    const triggers = {
      ...((trigger === 'click' || trigger.includes('click')) && {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          if (rest.disabled) return;
          if (select.label !== '' && options && options.length > 0) {
            const setFocus = options
              .map((val) => val.value)
              .indexOf(select.value);

            setFocusedIndex(setFocus);
          }
          setVisible(!visible);
        },
      }),
      ...((trigger === 'focus' || trigger.includes('focus')) && {
        onFocus: () => {
          if (rest.disabled) return;
          setVisible(true);
        },
        onBlur: () => setVisible(false),
      }),
    };

    const handleMouseUp = (event: any) => {
      const { target } = event;
      if (!dropdownMenuRef.current?.contains(target as HTMLElement)) {
        setTimeout(() => setVisible(false), 1);
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVisible(false);
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

    const onHandleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (onlySpaces(value)) {
        setSearch('');
        setListData(options || []);
      } else {
        setSearch(value);
        const newSearch = (options || []).filter((val) => {
          return (
            convertToAsciiString((val.label || '').toLowerCase()).indexOf(
              convertToAsciiString(value.trim().toLowerCase())
            ) > -1
          );
        });
        setListData(newSearch);
      }
    };

    const handleSelection = (selectedIndex: number) => {
      const selectedItem = listData[selectedIndex];
      setVisible((prev) => !prev);
      setListData(options || []);
      setSearch('');
      setSelect(selectedItem);
      if (onGetValue) onGetValue(selectedItem);
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

    useEffect(() => {
      if (!squareBoxRef.current) return;
      squareBoxRef.current.scrollIntoView({
        block: 'center',
      });
    }, [focusedIndex, visible]);

    const togglerProps = {
      'aria-expanded': visible,
      ...(!rest.disabled && { ...triggers }),
      ...triggers,
    };

    return (
      <Manager>
        <div
          className="ctn-select"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        >
          {label && (
            <div className="mb-2 block font-normal text-base leading-6 text-inks-6">
              {label}
            </div>
          )}
          <Reference>
            {({ ref }) => (
              <div
                tabIndex={0}
                className={classNames(
                  rest.disabled && 'select-header-disable',
                  error && 'select-header-error select-shadow-error',
                  !rest.disabled && !error && 'select-header-normal',
                  'flex justify-between items-center'
                )}
                {...togglerProps}
                ref={ref}
              >
                <input
                  type="text"
                  className={classNames(
                    rest.disabled && 'text-pending-5',
                    'select-header-input',
                    'placeholder:text-pending-4 placeholder:text-base placeholder:font-normal placeholder:leading-6'
                  )}
                  value={select.label}
                  ref={setInputRef}
                  {...rest}
                  disabled
                />
                <ArrowMedium />
              </div>
            )}
          </Reference>

          {error && (
            <p className="absolute mx-4 mt-1 text-reds-6 text-sm font-normal leading-5">
              {error}
            </p>
          )}
          {visible && (
            <Popper
              innerRef={dropdownMenuRef}
              placement="bottom"
              modifiers={[{ name: 'preventOverflow', enabled: false }]}
              strategy="fixed"
            >
              {(props) => (
                <div
                  className={classNames('select-body drop-shadow')}
                  style={props.style}
                  ref={props.ref}
                  data-placement={props.placement}
                >
                  {isSearch && (
                    <div className="mb-1">
                      <CFormInput
                        size="small"
                        value={search}
                        onChange={onHandleSearch}
                        datatype="searchSelect"
                        autoFocus={true}
                        placeholder="Search..."
                        right={<Search />}
                        hiddenClose={true}
                      />
                    </div>
                  )}
                  <ul className="scroll select-list-items">
                    {listData.length > 0 &&
                      listData.map((val, index) => {
                        return (
                          <li
                            onClick={() => {
                              handleSelection(index);
                              setFocusedIndex(index);
                              setSelect(val);
                              if (onGetValue) onGetValue(val);
                            }}
                            onMouseOver={handleHover}
                            ref={index === focusedIndex ? squareBoxRef : null}
                            key={val.value}
                            className={classNames(
                              'select-item',
                              index === focusedIndex && 'bg-ic-ink-1'
                            )}
                          >
                            <div className="flex items-center">
                              {val.left && (
                                <div className="w-[18px] h-[18px] mr-2">
                                  {val.left}
                                </div>
                              )}
                              <p>{val.label}</p>
                            </div>
                            {val.value === select.value && <Check />}
                            {val.right}
                          </li>
                        );
                      })}{' '}
                    {listData.length <= 0 && (
                      <li className="select-item">No result found</li>
                    )}
                  </ul>
                </div>
              )}
            </Popper>
          )}
        </div>
      </Manager>
    );
  }
);
