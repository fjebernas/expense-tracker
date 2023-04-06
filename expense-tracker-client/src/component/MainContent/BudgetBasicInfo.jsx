import { isObjectEmpty } from "../../utils/checker";
import { amountFormatter } from "../../utils/formatter";

function BudgetBasicInfo(props) {

  return (
    <>
      <h1 className="text-primary fs-1">
        { !isObjectEmpty(props.totals) ? props.budgetName : '--' }
      </h1>
      <h2 className="text-secondary fs-4">
        Remaining balance:&nbsp;
        <span className="text-success fs-4">
          {
            !isObjectEmpty(props.totals) ? amountFormatter.format(props.totals.income - props.totals.expense) : '--'
          }
        </span>
      </h2>
    </>
  );
}

export default BudgetBasicInfo;