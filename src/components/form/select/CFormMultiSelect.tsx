import classNames from 'classnames';
import type { ChangeEvent, HTMLAttributes } from 'react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { ArrowMedium, CheckBox, Close, Search } from '../../../icons';
import { convertToAsciiString, onlySpaces } from '../../../utils';
import { CFormInput } from '../CFormInput';

export type OptionMulti = {
  [x: string]: string | number | unknown;
  disabled?: boolean;
  label?: string;
  value?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};
type CFormMultiSelectProps = {
  className?: string;
  onGetValue?: (val: OptionMulti[]) => void;
  options?: OptionMulti[];
  value?: string | string[] | number;
  isSearch?: boolean;
  error?: string;
  placeholder?: string;
  label?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'size'>;

export const CFormMultiSelect = forwardRef<
  HTMLDivElement,
  CFormMultiSelectProps
>(
  (
    { isSearch, onGetValue, options, error, placeholder, label, ...rest },
    refs
  ) => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const squareBoxRef = useRef<HTMLLIElement>(null);

    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState<OptionMulti[]>([] as OptionMulti[]);
    const [search, setSearch] = useState<string>('');
    const [listData, setListData] = useState<OptionMulti[]>(options || []);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const setInputRef = useCallback(
      (inputElement: HTMLDivElement | null) => {
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

    const onOpenMultiSelect = () => {
      setVisible(!visible);
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

    const checkItems = (val: OptionMulti) => {
      return select.map((v) => v.value).includes(val.value || '');
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
      setListData(options || []);
      if (checkItems(selectedItem)) {
        const newData = select.reduce((arr, val) => {
          if (val.value !== selectedItem.value) {
            arr.push(val);
          }
          return arr;
        }, [] as OptionMulti[]);
        setSelect(newData);
      } else {
        setSelect((prev) => [...prev, selectedItem]);
      }
    };

    useEffect(() => {
      if (onGetValue) onGetValue(select);
    }, [select]);

    const handleHover: React.MouseEventHandler<HTMLLIElement> = (e) => {
      const { type } = e;
      if (type.toLowerCase() === 'mouseover') {
        setFocusedIndex(-1);
      }
    };

    const onHandleClearData = () => {
      setSelect([]);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      const { key } = e;
      let nextIndexCount = 0;
      if (key === 'ArrowDown')
        nextIndexCount = (focusedIndex + 1) % listData.length;
      if (key === 'ArrowUp')
        nextIndexCount = (focusedIndex + listData.length - 1) % listData.length;
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
    return (
      <Manager>
        <div
          ref={dropdownMenuRef}
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
                  ' flex justify-between items-center relative border bg-white cursor-pointer border-ic-ink-2 pl-1 pr-3 h-[40px] w-full rounded-lg',
                  visible && 'border-primarys-6 shadow-normal'
                )}
                ref={ref}
              >
                <div ref={setInputRef} {...rest}>
                  {select.length === 0 && (
                    <div className="text-base font-normal leading-6 text-inks-4 ml-2">
                      {placeholder}
                    </div>
                  )}
                  {select.length === 1 && (
                    <div className="bg-inks-6 flex items-center py-1 pl-3 pr-2 rounded-md">
                      <p className="text-base font-normal leading-6 text-white truncate">
                        {select[0]?.label}
                      </p>
                      <Close onClick={onHandleClearData} className="ml-2" />
                    </div>
                  )}
                  {select.length > 1 && (
                    <div className="bg-inks-6 flex items-center py-1 pl-3 pr-2 rounded-md">
                      <p className="text-base font-normal leading-6 text-white truncate">
                        {`${select.length} Selected`}
                      </p>
                      <Close onClick={onHandleClearData} className="ml-2" />
                    </div>
                  )}
                </div>
                <ArrowMedium onClick={onOpenMultiSelect} />
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
                              {checkItems(val) ? (
                                <CheckBox className="mr-3" />
                              ) : (
                                <div className="multi-select-check" />
                              )}
                              {val.left && (
                                <div className="w-[18px] h-[18px] mr-2">
                                  {val.left}
                                </div>
                              )}
                              <p>{val.label}</p>
                            </div>
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
CFormMultiSelect.displayName = 'CFormMultiSelect';
