import formStyles from '../../styles/Form.module.css';

const IdGenerator = ({ access, onSubmit, formDisabled, sitesList }) => (
  <form onSubmit={onSubmit}>
    <div className={formStyles.inputgroup}>
      <div className={formStyles.fieldset}>
        <label htmlFor="site" className={formStyles.label}>
          Site
        </label>
        <select
          name="site"
          className={formStyles.selectfield}
          disabled={formDisabled}
        >
          {sitesList
            .filter(site =>
              access.some(accessSite => accessSite.siteId === site.siteId)
            )
            .sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            })
            .map(site => (
              <option value={site.siteId} key={site.siteId}>
                {site.name} ({site.siteId})
              </option>
            ))}
        </select>
      </div>
      <div className={formStyles.buttongroup}>
        <button
          type="submit"
          className={formStyles.horizbutton}
          disabled={formDisabled}
        >
          Generate
        </button>
      </div>
    </div>
  </form>
);

export default IdGenerator;
