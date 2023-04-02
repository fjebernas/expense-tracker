import { amountFormatter } from "../../utils/formatter";

function BudgetBasicInfo(props) {
  return (
    <>
      <h1 className="text-primary fs-1">
        { props.budgetName.length > 0 ? props.budgetName : '--' }
      </h1>
      <h2 className="text-secondary fs-4">
        Remaining balance:&nbsp;
        <span className="text-success fs-4">
          {
            props.totals.length > 0 ? amountFormatter.format(props.totals[0].amount - props.totals[1].amount) : '--'
          }
        </span>
      </h2>
    </>
  );
}

export default BudgetBasicInfo;