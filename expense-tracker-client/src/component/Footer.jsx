function Footer() {
  return (
    <footer className="mb-0 mt-auto py-2">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h5 className="pt-2 pb-2">
              <span className='text-muted'>
                Expense Tracker by
              </span>
              <a
                href="https://github.com/fjebernas/expense-tracker"
                className="text-decoration-none text-info"
                target="_blank"
                rel="noreferrer"
              >
                &nbsp;Francis Bernas
              </a>
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;