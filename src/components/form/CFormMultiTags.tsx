import classNames from 'classnames';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import type { CFormControlWrapperProps } from './CFormControlWrapper';
import { CFormControlWrapper } from './CFormControlWrapper';

export interface CFormMultiTagsProps extends CFormControlWrapperProps {
  className?: string;
  disabled?: boolean;
  onChange?: (val: { id: string; value: string }[]) => void;
  plainText?: boolean;
  readOnly?: boolean;
  value?: string | string[] | number;
  placeholder: string;
}

export const CFormMultiTags = forwardRef<HTMLInputElement, CFormMultiTagsProps>(
  (
    {
      children,
      className,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingLabel,
      id,
      invalid,
      label,
      onChange,
      valid,
      ...rest
    },
    ref
  ) => {
    const _className = classNames(
      rest.disabled && 'form-disable',
      invalid && 'form-error dropdown-shadow-error',
      !rest.disabled && !invalid && 'form-normal dropdown-shadow-normal',
      `relative flex pl-1 pr-[20px] py-1 flex-wrap items-start content-start outline-none rounded-lg  resize-none w-full placeholder:text-inks-4 placeholder:font-normal placeholder:text-base placeholder:leading-6`
    );

    const inputRef = useRef<HTMLInputElement | null>(null);
    const uuid = useId();
    const [value, setValue] = useState<string>('');
    const [listData, setListData] = useState<{ id: string; value: string }[]>(
      []
    );

    useEffect(() => {
      if (onChange) onChange(listData);
    }, [listData]);

    const setInputRef = useCallback(
      (inputElement: HTMLInputElement | null) => {
        inputRef.current = inputElement;

        if (!ref) {
          return;
        }

        if (typeof ref === 'object') {
          ref.current = inputElement;
        }

        if (typeof ref === 'function') {
          ref(inputElement);
        }
      },
      [ref]
    );

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (value && e.key === 'Enter') {
        setListData((prev) => [...prev, { id: uuid, value }]);
        setValue('');
      }
      if (e.key === 'Backspace' && value === '') {
        setListData(listData.slice(0, -1));
      }
    };

    const editListData = (data: { id: string; value: string }) => {
      const newData = listData.reduce(
        (
          arr: {
            id: string;
            value: string;
          }[],
          val
        ) => {
          if (val.id !== data.id) {
            arr.push(val);
          }
          return arr;
        },
        []
      );
      setListData(newData);
    };

    const autoFocus = () => {
      inputRef.current?.focus();
    };

    const setValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <CFormControlWrapper
        describedby={'aria-describedby'}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingLabel={floatingLabel}
        id={id}
        invalid={invalid}
        label={label}
        valid={valid}
      >
        <div
          onKeyDown={handleKeyDown}
          className={classNames(className, _className, 'relative wrap_1')}
          onClick={autoFocus}
        >
          <div className="pull-tab"></div>
          {listData.map((val) => {
            const onSelectItem = () => {
              editListData(val);
            };
            return (
              <div key={val.id} className={classNames(`form-tags`)}>
                <p className={classNames(`form-tags-text`)}>{val.value}</p>
                <span
                  onClick={onSelectItem}
                  className={classNames(`form-tags-close`)}
                >
                  &times;
                </span>
              </div>
            );
          })}
          <input
            id={id}
            className="form-tags-input"
            value={value}
            {...rest}
            ref={setInputRef}
            onChange={setValueInput}
            autoComplete="off"
          >
            {children}
          </input>
        </div>
      </CFormControlWrapper>
    );
  }
);

CFormMultiTags.displayName = 'CFormMultiTags';
