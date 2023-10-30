import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartCommon = ({...props}) => {
  return (
    <div className="relative w-full h-full rounded-lg bg-white p-6 box-border">
      <div className="flex justify-between">
        <div className="text-[22px] leading-[28px] font-medium text-neutral-08">{props.title}</div>
        <div className="flex gap-3">
          {props.filters && props.filters.map((item: any, index: number) => {
            return (
              <div 
                key={index} 
                className={"py-2 px-3 rounded-lg text-[12px] leading-[16px] font-normal text-neutral-09 tracking-[.4] cursor-pointer" + (item.value === props.selectedFilter ? " bg-primary-03" : "")}
                onClick={() => props.setSelectedFilter(item.value)}
              >
                {item.text}
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-[14px] leading-[20px] tracking-[.25] font-normal text-neutral-08 my-3 w-8 text-right">{props.subTitle}</div>
      <div className="w-full h-[260px]">
        <HighchartsReact 
          highcharts={Highcharts} 
          options={props.options}
          containerProps={{
            style: {
              width: '100%',
              height: '100%'
            }
          }}
        />
      </div>
    </div>
  )
}

export default ChartCommon;