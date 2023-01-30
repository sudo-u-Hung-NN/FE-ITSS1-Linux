import Pagination from "react-bootstrap/Pagination";
export const AdminPagination = ({ total, current, onChangePage }) => {
  let item = [];
  if (current > 1) {
    item.push(
      <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
    );
  }
  for (let page = 1; page <= total; page++) {
    item.push(
      <Pagination.Item
        key={page}
        active={page === current}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }
  if (current < total) {
    item.push(
      <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
    );
  }
  return <Pagination>{item}</Pagination>;
};
