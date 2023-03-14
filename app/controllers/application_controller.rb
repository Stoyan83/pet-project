class ApplicationController < ActionController::API

  def success_with_meta(blueprint = {}, options = {}, code = nil)
    code ||= :ok
    meta = options[:meta] || {}
    
    render json: {meta: meta, data: blueprint}, status: code
  end

  def success(blueprint = {}, code = nil)
    code ||= :ok
    
    render json: {data: blueprint}, status: code
  end


  def errors(errors, code = nil)
    code ||= :unprocessable_entity

    render json: {errors: errors}, status: code
  end

end
