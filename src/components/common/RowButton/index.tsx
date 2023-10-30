import {useTranslations} from "next-intl";
import ButtonCommon from "~/components/common/ButtonCommon";

const RowButton = ({...props}) => {
  const button = useTranslations('common.button')
  return (
    <>
      <div className={`w-100 btn-area flex justify-end h-[88px] fixed bottom-0 right-0 z-[100] ${props.className || ''}`}>
        {
          props.handleCancel ?
            (
              <ButtonCommon
                className="ml-3 btn bg-white m-[16px]"
                variant="outlined"
                color="primary"
                size="large"
                onClick={props.handleCancel}
                title={button("cancel")}
              />
            ) :
            ''
        }
        {
          props.handleContinue ?
            (
              <ButtonCommon
                className="ml-3 btn m-[16px] rounded-3xl font-medium leading-[24px]"
                variant="contained"
                size="large"
                onClick={props.handleContinue}
                title={props.isSubmitBtn ? button("submit") : button("continue")}
              />
            ) :
            ''
        }
        {
          props.handleSubmit ?
            (
              <ButtonCommon
                className="ml-3 btn bg-primary m-[16px]"
                variant="contained"
                color="primary"
                size="large"
                onClick={props.handleSubmit}
                title={props.submitLabel ?? button("submit")}
              />
            ) :
            ''
        }
      </div>
    </>
  )
}

export default RowButton;