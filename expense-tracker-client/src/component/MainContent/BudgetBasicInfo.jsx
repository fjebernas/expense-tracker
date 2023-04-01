function BudgetBasicInfo(props) {
  return (
    <>
      <h1 className="text-primary fs-1">
        { props.budgetName.length > 0 ? props.budgetName : '--' }
      </h1>
      <h2 className="text-secondary fs-4">
        Remaining balance: Php&nbsp;
        {
          props.totals.length > 0 ? (props.totals[0].amount - props.totals[1].amount ).toFixed(2) : '--'
        }
      </h2>
    </>
  );
}

export default BudgetBasicInfo;