class ApplicationController < ActionController::API
  def success(blueprint = {}, options = {})
    code ||= :ok
    meta = options[:meta] || {}
    render json: {meta: meta, data: blueprint}, status: code
  end
  def errors(errors, code = nil)
  
    code ||= :unprocessable_entity

    render json: {errors: errors}, status: code
  end

end
