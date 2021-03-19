import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFlexLayout, useTable, useSortBy } from 'react-table';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import scrollbarWidth from './scrollbarWidth';
import { Wrapper } from './styles';
import SortArrows from '../Icons/SortArrows';
import SortDesc from '../Icons/SortDesc';
import SortAsc from '../Icons/SortAsc';

export default function Table({ columns, data, virtualisedList = false }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
  const BOTTOM_PADDING = 40;

  const tableArgs = [useSortBy];

  if (virtualisedList) {
    tableArgs.push(useFlexLayout);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable(
    { columns, data, defaultColumn: virtualisedList ? defaultColumn : {} },
    ...tableArgs
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => (
            <div {...cell.getCellProps()} className="td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows]
  );

  const InnerElement = forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + BOTTOM_PADDING}px`,
      }}
      {...rest}
    />
  ));

  InnerElement.propTypes = { style: PropTypes.object };
  InnerElement.displayName = 'InnerElement';

  const ColumnSortArrows = ({ column }) => {
    const { isSorted, isSortedDesc } = column;
    if (!isSorted) {
      return <SortArrows />;
    }

    if (isSortedDesc) {
      return <SortDesc />;
    }

    return <SortAsc />;
  };

  ColumnSortArrows.propTypes = { column: PropTypes.object };

  if (virtualisedList) {
    return (
      <Wrapper {...{ virtualisedList }}>
        <div
          {...getTableProps()}
          className="table"
          style={{ minWidth: '100%' }}
        >
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="core-heading core-heading--senary th"
                  >
                    <ColumnSortArrows {...{ column }} />
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()} className="tbody">
            <AutoSizer>
              {({ height }) => (
                <FixedSizeList
                  height={height + scrollBarSize}
                  innerElementType={InnerElement}
                  itemCount={rows.length}
                  itemSize={50}
                  width={totalColumnsWidth + scrollBarSize}
                >
                  {RenderRow}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps([
                    {
                      className: `core-heading core-heading--senary`,
                    },
                    column.getSortByToggleProps(),
                  ])}
                >
                  <ColumnSortArrows {...{ column }} />
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  virtualisedList: PropTypes.bool,
  column: PropTypes.object,
};
