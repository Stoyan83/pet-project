class ApplicationController < ActionController::API
  def success(blueprint = {}, code = nil)
    code ||= :ok

    render json: blueprint, status: code
  end

  def errors(errors, code = nil)
  
    code ||= :unprocessable_entity

    render json: {errors: errors}, status: code
  end

end
